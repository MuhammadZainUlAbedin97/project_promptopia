"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClicked }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClicked={handleTagClicked}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
		};
		fetchPosts();
	}, []);

	const filteredPosts = posts.filter((post) => {
		const prompt = post.prompt.toLowerCase();
		const tag = post.tag.toLowerCase();
		const searchTerm = searchText.toLowerCase();
		return prompt.includes(searchTerm) || tag.includes(searchTerm);
	});

	const handleTagClicked = (tag) => {
		setSearchText(tag);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			<PromptCardList
				data={filteredPosts}
				handleTagClicked={handleTagClicked}
			/>
		</section>
	);
};

export default Feed;
