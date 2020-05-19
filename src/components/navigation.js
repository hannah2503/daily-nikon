import React from 'react';

export default (pageNumber = 1, totalPages = 1) => {
	return (
		<div className="page-links-container">
			{pageNumber === 1 && pageNumber < totalPages && (
				<a className="page-links" href={`/day/${pageNumber + 1}`}>
					Next
				</a>
			)}

			{pageNumber > 1 && pageNumber < totalPages && (
				<div>
					<a className="page-links" href={`/day/${pageNumber - 1}`}>
						Back
					</a>
					<a className="page-links" href={`/day/${pageNumber + 1}`}>
						Next
					</a>
				</div>
			)}

			{pageNumber > 1 && pageNumber === totalPages && (
				<div>
					<a className="page-links" href={`/day/${pageNumber - 1}`}>
						Back
					</a>
				</div>
			)}

			{totalPages <= 1 && (
				<div>
					<a className="page-links" href={`/`}>
						Back
					</a>
				</div>
			)}
		</div>
	);
};
