import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

// Main component for the Questionnaire
const Questionnaire = () => {
    const navigate = useNavigate();
    // Tracks answers for each question in the questionnaire
    const [answers, setAnswers] = useState({
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
    // Tracks form validation errors
    const [errors, setErrors] = useState({});
    // Stores recommendations based on answers
    const [recommendations, setRecommendations] = useState('');
    // Handles input changes in form fields
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setAnswers({
            ...answers,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    // Validates fields in the form
    const validateForm = () => {
        let formErrors = {};

        if (!answers.name) formErrors.name = 'Name is required';
        if (!answers.age || isNaN(answers.age)) formErrors.age = 'Valid age is required';
        if (!answers.mood) formErrors.mood = 'Please select a mood';
        if (!answers.stressLevel) formErrors.stressLevel = 'Please provide a stress level';
        if (!answers.eatingHabits) formErrors.eatingHabits = 'Please provide information about your eating habits';
        if (!answers.location) formErrors.location = 'Location is required';
        if (!answers.province) formErrors.province = 'Province is required';

        // Update errors state
        setErrors(formErrors);

        // Return true if there are no errors
        return Object.keys(formErrors).length === 0;
    };

    // Handles form submission
    const submitHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            generateRecs();
        }
    };

    // Generates recommendations based on answers
    const generateRecs = () => {
        if (answers.mood === 'sad' || answers.stressLevel === 'high' || answers.inCrisis) {
            // Provide crisis support recommendation
            setRecommendations('We recommend contacting a mental health professional immediately.');
            // Confirms with the user prior to navigating to the crisis support page
            const confirmRedirect = window.confirm(
                "Based on your response, we recommend crisis support. Do you want to proceed?"
            );
            if (confirmRedirect) {
                // Navigates to the crisis support page
                navigate('/crisis-support');
            }
        } else {
            // Provide recommendations for non-crisis situations
            setRecommendations('Based on your responses, regular monitoring or light therapy might be sufficient');
        }
    };
    return (
        <div style="questionnaire-popup">
            <h2>Mental Heath Questionnaire</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={answers.name} onChange={handleChange}/>
                    {errors.name && <span>{errors.name}</span>}
                </div>

                <div>
                    <label>Age:</label>
                    <input type="text" name="age" value={answers.age} onChange={handleChange}/>
                    {errors.age && <span>{errors.age}</span>}
                </div>

                <div>
                    <label>Mood:</label>
                    <select name="mood" value={answers.mood} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="neutral">Neutral</option>
                    </select>
                    {errors.mood && <span>{errors.mood}</span>}
                </div>

                <div>
                    <label>Stress Level:</label>
                    <select name="stressLevel" value={answers.stressLevel} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    {errors.stressLevel && <span>{errors.stressLevel}</span>}
                </div>

                <div>
                    <label>Eating Habits:</label>
                    <input type="text" name="eatingHabits" value={answers.eatingHabits} onChange={handleChange}/>
                    {errors.eatingHabits && <span>{errors.eatingHabits}</span>}
                </div>

                <div>
                    <label>Are you currently in a crisis?</label>
                    <input type="checkbox" name="inCrisis" checked={answers.inCrisis} onChange={handleChange}/>
                </div>

                <div>
                    <label>Are you on any prescription medication?</label>
                    <input type="checkbox" name="onPrescription" checked={answers.onPrescription}
                           onChange={handleChange}/>
                </div>

                <div>
                    <label>Are you currently seeing a therapist?</label>
                    <input type="checkbox" name="currentlySeeing" checked={answers.currentlySeeing}
                           onChange={handleChange}/>
                </div>

                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={answers.location} onChange={handleChange}/>
                    {errors.location && <span>{errors.location}</span>}
                </div>

                <div>
                    <label>Province:</label>
                    <input type="text" name="province" value={answers.province} onChange={handleChange}/>
                    {errors.province && <span>{errors.province}</span>}
                </div>

                <div>
                    <label>Is remote counseling acceptable to you?</label>
                    <input type="checkbox" name="isRemote" checked={answers.isRemote} onChange={handleChange}/>
                </div>

                <div>
                    <label>Do you need a translator?</label>
                    <input type="checkbox" name="needTranslator" checked={answers.needTranslator}
                           onChange={handleChange}/>
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={onClose} className="close-btn">Close</button>
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