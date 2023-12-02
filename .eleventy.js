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
  // When `permalink` is false, the file is not written to disk
	eleventyConfig.addGlobalData("eleventyComputed.permalink", function() {
		return (data) => {
			// Always skip during non-watch/serve builds
			if(data.draft && !process.env.BUILD_DRAFTS) {
				return false;
			}

			return data.permalink;
		}
	});

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
	eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function() {
		return (data) => {
			// Always exclude from non-watch/serve builds
			if(data.draft && !process.env.BUILD_DRAFTS) {
				return true;
			}

			return data.eleventyExcludeFromCollections;
		}
	});

	eleventyConfig.on("eleventy.before", ({runMode}) => {
		// Set the environment variable
		if(runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true;
		}
	});

  eleventyConfig.addFilter("dateToWords", function (date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (typeof date === 'string') {
      date = new Date(date)
    }

    return `${toOrdinal(date.getDate())} of ${months[date.getMonth()]} ${date.getFullYear()}`
  })

  eleventyConfig.addFilter("onlyshozomatzu", function (collection) {
    // console.log(collection[0].url.split('/'))
    return collection.filter(post => post.url.split('/').length > 3 && post.url.split('/')[3] === 'shōzōmatsu')
  })

  let pathPrefix = process.env.PATH_PREFIX ? process.env.PATH_PREFIX : "";

  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('images');
  return {
    passthroughFileCopy: true,
    pathPrefix
  }
}