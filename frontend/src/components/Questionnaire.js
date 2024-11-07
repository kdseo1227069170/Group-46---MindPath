import React, {useState} from "react";

const Questionnaire = () => {
    const [clientAnswers, setClientAnswers] = useState({
        name: '',
        age: '',
        mood: '',
        stressLevel: '',
        eatingHabits: '',
        inCrisis: false,
        onPrescription: false,
        currentlySeeing: '',
        location: '',
        province: '',
        isRemote: false,
        needTranslator: false,
    });

    const [errors, setErrors] = useState({});
    const [recommendations, setRecommendations] = useState('');

    const changeHandler = (e) => {
        const {name, value, type, checked} = e.target;
        setClientAnswers({
            ...clientAnswers,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        let formErrors = {};

        if (!clientAnswers.name) formErrors.name = 'Name is required';
        if (!clientAnswers.age || isNaN(clientAnswers.age)) formErrors.age = 'Valid age is required';
        if (!clientAnswers.mood) formErrors.mood = 'Please select a mood';
        if (!clientAnswers.stressLevel) formErrors.stressLevel = 'Please provide a stress level';
        if (!clientAnswers.eatingHabits) formErrors.eatingHabits = 'Please provide information about your eating habits';
        if (!clientAnswers.location) formErrors.location = 'Location is required';
        if (!clientAnswers.province) formErrors.province = 'Province is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            generateRecs();
        }
    };

    const generateRecs = () => {
        if (clientAnswers.mood === 'sad' || clientAnswers.stressLevel === 'high' || clientAnswers.inCrisis) {
            setRecommendations('We recommend contacting a mental health professional immediately.');
        } else {
            setRecommendations('Base on your responses, regular monitoring or light therapy might be sufficient');
        }
    };
    return (
        <div>
            <h2>Mental Heath Questionnaire</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value{clientAnswers.name} onChange={changeHandler}/>
                    {erros.name && <span>{errors.name}</span>}
                </div>

                

            </form>

            {recommendations && (
                <div>
                    <h3>Recommendations</h3>
                    <p>{recommendations}</p>
                </div>
            )}
        </div>
    );
};

export default Questionnaire;