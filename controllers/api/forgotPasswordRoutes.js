const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require('nodemailer');

// Route to display forgot password form
router.get('/', (req, res) => {
    res.render('forgot-password'); 
});

// Route to handle forgot password form submission
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate and save password reset token
        const resetToken = generateResetToken(); // Implement a function to generate a unique token
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        await user.save();

        // Send password reset email
        await sendPasswordResetEmail(user.email, resetToken, req); // Pass req to get host details

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error('Error in forgot password:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to send password reset email (using nodemailer)
async function sendPasswordResetEmail(email, token, req) {
    const transporter = nodemailer.createTransport({
        // Configure your email provider here
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_password'
        }
    });

    const mailOptions = {
        from: 'samandeepkaur34@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
            + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
            + `http://${req.headers.host}/reset/${token}\n\n`
            + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = router;
