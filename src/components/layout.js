/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import '../scss/main.scss';

const Layout = ({ sticky, children }) => {
	return (
		<>
			<div className="layout">
				<main>{children}</main>
				<footer
					className={sticky ? 'footer footer-sticky' : ' footer footer-fixed'}
				>
					<p>© {new Date().getFullYear()} adventures first, tea after. All photos taken with a Nikon D40X. </p>
				</footer>
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	sticky: PropTypes.bool.isRequired,
};

export default Layout;
