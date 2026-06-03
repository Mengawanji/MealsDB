// import "../styles/detailsPage.css"

// export default function Details ({meal}) {
//     return (
//         <>
//         <div className="container">
//             <header>
//                 <h1>Delicious Meals</h1>
//                 <p className="subtitle">Discover amazing recipes from around the world</p>
//             </header>

//             <div className="meals-container">
//                 <div className="loading">Loading meals...</div>
//             </div>
//         </div>
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" className="meal-image"/>
//         <div className="meal-info">
//             <h3 className="meal-name">{meal.strMeal}</h3>
//             <span className="meal-category">{meal.strCategory}</span>
//             <p className="meal-instructions">{instructionsPreview}</p>
            
//             <div className="ingredients-title">Key Ingredients:</div>
//             <div className="ingredients-list">
//                 ${ingredients.slice(0, 5).map(ing => 
//                     `<span class="ingredient-tag">${ing.name}</span>`
//                 ).join('')}
//                 ${ingredients.length > 5 ? `<span class="ingredient-tag">+${ingredients.length - 5} more</span>` : ''}
//             </div>
//         </div>
//         </>
//     )
// }