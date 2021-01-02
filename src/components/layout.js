/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Img } from 'react-image';

import profile from '../images/profile.jpg';

import '../scss/main.scss';

const Layout = ({ children }) => {
	return (
		<div className="screen">
				<header>
					<div className="heading-image-container">
							<Img src={profile} alt="self-portrait with camera" />
					</div>	
					<h1 className="heading-xl"> Daily Nikon </h1>
				</header>
			<div className="layout">
				<aside>
					<h2 className="heading-l">Hannah Cross</h2>
					<h3>Photography & Web Development</h3>
					<p>
						After the novelty of a forced working from home had worn off, I needed a creative outlet to allow myself to do something that wasn't work related.
					</p>
					<p>
						I dusted off a Nikon camera my aunt had given to me and decided to make a start at figuring out how to use it!
					</p>
					<p>
						Whilst I enjoy taking snaps of the world around me; of the things that bring me joy, I also thought this would be a good excuse to experiment with some web development tools.
					</p>
					<p>
						This website has been made with Gatsby, AWS S3 and Netlify. It is an ongoing project, subject to constant tweaks and modifications as I continue learning.
					</p>
				</aside>
				<main>{children}</main>
			</div>
			<footer>
				<p>© {new Date().getFullYear()} - Adventures first, tea after. All photos taken with a Nikon D40X. Website built with GatsbyJS. </p>
			</footer>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
