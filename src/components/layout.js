/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import '../scss/main.scss';

const Layout = ({ children }) => {
	return (
		<>
			<div className="layout">
				<header></header>
				<main>{children}</main>
				<footer>
					<p>© {new Date().getFullYear()} adventures first, tea after. All photos taken with a Nikon D40X. </p>
				</footer>
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
