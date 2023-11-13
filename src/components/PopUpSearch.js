import "./PopUpSearch.css";

import { useForm } from "react-hook-form";

export default function PopUpSearch({
    className,
	hSearch,
	hClickResult,
	placeholder,
	results,
	renderResult,
    reference
}) {
	const {
		register,
		handleSubmit,
        formState: { isValid ,errors}
	} = useForm({ mode: "onChange" });

	return (
		<div className={`${className ? className : ""} popup-search-container`} ref={reference}>
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
						{...register("search_value", { 
                            required: { value: true, message: "Search field cannot be empty" },
                            minLength: { value: 3, message: 'City name cannot be shorter than 3 characters' },
                            maxLength : { value: 15, message: 'City name cannot be longer than 15 characters' }
                        })}
					/>
					<input
                        disabled ={!isValid}
						type="submit"
						className="popup-search__form__button popup-search__form__item"
						value="Search"
					/>
				</form>
                {errors.search_value && <div className="form-error">{errors.search_value.message}</div>}

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
