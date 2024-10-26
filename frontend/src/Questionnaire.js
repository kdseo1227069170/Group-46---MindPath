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
}
