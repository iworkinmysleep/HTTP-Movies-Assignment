import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const UpdateMovie = () => {
	const params = useParams();
	const history = useHistory();
	console.log("params", params);
	const [movieUpdate, setMovieUpdate] = useState([
		{
			id: params.id,
			title: "",
			director: "",
			metascore: "",
			stars: [],
		},
	]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${params.id}`, movieUpdate)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err.response));
		history.push("/");
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
