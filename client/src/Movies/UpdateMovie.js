import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const UpdateMovie = () => {
	const { id } = useParams();
	console.log("id", id);
	const history = useHistory();
	const [movieUpdate, setMovieUpdate] = useState({
		title: "",
		director: "",
		metascore: 0,
		stars: [],
	});

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				setMovieUpdate(res.data);
			})
	}, [id]);

	const handleChanges = (e) => {
		e.persist();
		let value =
			e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
		setMovieUpdate({
			...movieUpdate,
			[e.target.name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put(`http://localhost:5000/api/movies/${id}`, movieUpdate)
			.then((res) => {
				history.push(`/movies/${id}`);
			})
			.catch((err) => console.log(err.response));
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
							value={movieUpdate.stars.join(',')}
							onChange={handleChanges}></input>
					</label>
					<button type="submit">Submit Changes</button>
				</form>
			</div>
		</>
	);
};

export default UpdateMovie;
