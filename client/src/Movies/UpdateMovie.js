import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const UpdateMovie = (props) => {
	const params = useParams();
	console.log("params", params);
	const history = useHistory();
	const [movieUpdate, setMovieUpdate] = useState({ id: params.id });

	// useEffect(() => {
	// 	axios.get(`http://localhost:5000/api/movies/${params.id}`).then(res => {
	// 		setMovieUpdate(res.data)
	// 	})
	// },[params.id])

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedMovie = {
			...movieUpdate,
			stars: movieUpdate.stars.split(", "),
		};
		axios
			.put(`http://localhost:5000/api/movies/${params.id}`, updatedMovie)
			.then((res) => {
				history.push("/");
			})
			.catch((err) => console.log(err.response));
	};

	const handleChanges = (e) => {
		setMovieUpdate({
			...movieUpdate,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<>
			<div className="update-form">
				<h2>Update Movie</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">
						Title:
						<input
							type="text"
							placeholder="new title..."
							name="title"
							value={movieUpdate.title}
							onChange={handleChanges}></input>
					</label>
					<label htmlFor="director">
						Director:
						<input
							type="text"
							placeholder="new director..."
							name="director"
							value={movieUpdate.director}
							onChange={handleChanges}></input>
					</label>
					<label htmlFor="metascore">
						Metascore:
						<input
							type="text"
							placeholder="new metascore..."
							name="metascore"
							value={movieUpdate.metascore}
							onChange={handleChanges}></input>
					</label>
					<label htmlFor="stars">
						Title:
						<input
							type="text"
							placeholder="new stars..."
							name="stars"
							value={movieUpdate.stars}
							onChange={handleChanges}></input>
					</label>
					<button type="submit">Submit Changes</button>
				</form>
			</div>
		</>
	);
};

export default UpdateMovie;
