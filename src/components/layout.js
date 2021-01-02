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
		<div>
			<div className="layout">
				<header>
					<h1 className="heading-xl"> Daily Nikon </h1>
					<h2 className="heading-l">Hannah Cross</h2>
					<p>Photography & Web Development</p>
					<div className="heading-image-container">
						<Img src={profile} alt="self-portrait with camera" />
					</div>		
				</header>	
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
