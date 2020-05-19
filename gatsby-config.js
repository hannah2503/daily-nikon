require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
		title: `Daily Nikon`,
		description: `A lockdown project, learning to use my Nikon and how to build Gatsby websites`,
		author: `Hannah Cross`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/favicon.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: 'gatsby-source-s3',
			options: {
				aws: {
					accessKeyId: process.env.ACCESS_KEY_ID,
					secretAccessKey: process.env.SECRET_ACCESS_KEY,
				},
				buckets: ['mydailynikon'],
				domain: 'mydailynikon.s3-eu-west-1.amazonaws.com',
			},
		},
		`gatsby-plugin-sass`,
	],
};