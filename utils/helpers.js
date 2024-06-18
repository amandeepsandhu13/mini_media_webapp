module.exports = {
  formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const diffMs = now - date; // difference in milliseconds
    const diffMins = Math.round(diffMs / 60000); // difference in minutes
    const diffHrs = Math.round(diffMs / 3600000); // difference in hours

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;

    if (diffMins < 60) {
        formattedDate += ` today ${diffMins} minutes ago`;
    } else if (diffHrs < 24) {
        formattedDate += ` today ${diffHrs} hours ago`;
    }

    return formattedDate;
},
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
  
};
