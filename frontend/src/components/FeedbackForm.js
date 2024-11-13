import React, { useState } from 'react';

const FeedbackForm = () => {
    const [rating, setRating] = useState(1);
    const [comments, setComments] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, comments }),
            });
            if (response.ok) {
                alert('Thank you for your feedback!');
                setRating(1);
                setComments('');
            } else {
                alert('Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Rating:
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Comments:
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </label>
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
