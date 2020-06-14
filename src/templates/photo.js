import React from 'react';
import { Img } from 'react-image';

import SEO from '../components/seo';
import Navigation from '../components/navigation';

import '../scss/main.scss';

export default ({ pageContext: { photo } }) => {
	console.log(photo);
	const {
		day,
		pageNumber,
		totalPages,
		name,
		childImageSharp: {
			fixed: { src },
		},
	} = photo;

	return (
		<>
			<SEO title={`Photo ${day}`} />

			<header className="header-photo">
				<a className="heading-link" href="/">
					<span> ◁ </span>
				</a>
				<div className="heading">
					<h2>{day}</h2>
				</div>
			</header>

			<main className="container">
				<div className="image-container">
					<Img src={src} key={name} alt={name} decode={true} loading="lazy" />
				</div>

				<div className="sub-text">
					<div>
						<small>© Daily Nikon - {day}</small>
					</div>
					<Navigation pageNumber={pageNumber} totalPages={totalPages} />
				</div>
			</main>
		</>
	);
};
