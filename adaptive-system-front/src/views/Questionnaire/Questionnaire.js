import React, { useState, useEffect } from 'react';
import { getQuestions } from '../../services/users';

const Questionnaire = () => {
	let [ question, setQuestion ] = useState(null);

	useEffect(() => {
		(async () => {
			let res = await getQuestions();
			setQuestion(res.data.question);
		})();
	}, []);

	return (
		<div>
			<h2>Strona główna</h2>
			{question === null ? (
				<p>Pytania są niedostępne</p>
			) : (
				<ul className="list">
					<li className="list-item" >
						{question}
					</li>
				</ul>
			)}
		</div>
	);
};

export default Questionnaire;
