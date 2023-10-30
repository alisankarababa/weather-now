import "./PopUpSearch.css";

import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function PopUpSearch({
	hSearch,
	hClickResult,
	placeholder,
	results,
	renderResult,
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<div className="popup-search-container">
			<div className={`popup-search`}>
				<form
					className="popup-search__form"
					onSubmit={handleSubmit((formData) => hSearch(formData.search_value))}
				>
					<label htmlFor="popup-search__form__search-input"
                            className="popup-search__form__search-input-label popup-search__form__item"
                    >City:</label>
					<input
						id="popup-search__form__search-input"
						type="search"
						className="popup-search__form__search-input popup-search__form__item"
						placeholder={placeholder}
						{...register("search_value", { required: true, maxLength: 80 })}
					/>
					<input
						type="submit"
						className="popup-search__form__button popup-search__form__item"
						value="Search"
					/>
				</form>

				{results.length > 0 && (
					<div className="popup-search__results--container">
                        <div className="popup-search__results">
						    <ul>
						    	{results.map((result, idx) => (
						    		<li className="popup-search__results__item" onClick={() => hClickResult(idx)} key={idx}>
						    			{renderResult(result)}
						    		</li>
						    	))}
						    </ul>
                        </div>
					</div>
				)}
			</div>
		</div>
	);
}
