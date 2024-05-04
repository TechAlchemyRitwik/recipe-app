// App.js 

import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

const App = () => { 
	const APP_ID = 'YOUR_API_ID'; 
	const APP_KEY = 'YOUR_API_KEY'; 
	const [food_recipes, setfood_recipes] = useState([]); 
	const [search_recipe, setSearch_recipe] = useState(''); 
	const [search_query, setSearch_Query] = useState('chicken'); 

	useEffect(() => { 
		getRecipesFunction(); 
	}, [search_query]); 

	const getRecipesFunction = async () => { 
		const response = await fetch( 
`https://api.edamam.com/search?q=${search_query}&app_id=${APP_ID}&app_key=${APP_KEY}` 
		); 
		const data = await response.json(); 
		setfood_recipes(data.hits); 
	}; 

	const updateSearchFunction = (e) => { 
		setSearch_recipe(e.target.value); 
	}; 

	const getSearchFunction = (e) => { 
		e.preventDefault(); 
		setSearch_Query(search_recipe); 
		setSearch_recipe(''); 
	}; 

	return ( 
		<div className="bg-blue-50 min-h-screen font-sans"> 
			<header className="bg-blue-500 py-4 text-white"> 
				<div className="container mx-auto text-center"> 
					<h1 className="text-3xl sm:text-4xl 
								md:text-5xl lg:text-6xl 
								font-extrabold tracking-tight"> 
						<span className="block">Ritwik's 
							Recipe Finder</span> 
					</h1> 
				</div> 
			</header> 
			<div className="container mx-auto mt-8 p-4 
							sm:px-6 lg:px-8"> 
				<form 
					onSubmit={getSearchFunction} 
					
				> 
					<div className="relative justify-center flex-grow 
									w-full sm:w-1/2"> 
						<input 
							type="text"
							name="search"
							value={search_recipe} 
							onChange={updateSearchFunction} 
							placeholder="Search for recipes..."
						
						/> 
					</div> 
					<button 
						type="submit"
					
					> 
						Search Recipe 
					</button> 
				</form> 
			</div> 

			<div className="container mx-auto mt-8 p-4 sm:px-6 lg:px-8"> 
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
				lg:grid-cols-4 gap-4"> 
					{food_recipes.map((recipe) => ( 
						<RecipeCard key={recipe.recipe.label} recipe={recipe.recipe} /> 
					))} 
				</div> 
			</div> 
		</div> 
	); 
}; 

export default App; 
