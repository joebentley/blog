function toOrdinal(number) {
  if (number === 1) {
    return "1st";
  } else if (number === 2) {
    return "2nd";
  } else if (number === 3) {
    return "3rd";
  } else {
    return `${number}th`;
  }
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("dateToWords", function (date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (typeof date === 'string') {
      date = new Date(date)
    }

    return `${toOrdinal(date.getDate())} of ${months[date.getMonth()]} ${date.getFullYear()}`
  })

  let pathPrefix = process.env.PATH_PREFIX ? process.env.PATH_PREFIX : "";

  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('images');
  return {
    passthroughFileCopy: true,
    pathPrefix
  }
}