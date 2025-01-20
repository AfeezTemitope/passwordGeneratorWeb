import { useState } from 'react';
// import './index.css';

const App = () => {
    const [password, setPassword] = useState('');

    const genPassword = async () => {
        try {
            const response = await fetch('http://localhost:3000/generateRandomPassword');
            const data = await response.json();
            if (data.password) {
                setPassword(data.password);
            } else {
                console.error('Password not received from server.');
            }
        } catch (error) {
            console.error('Error fetching password:', error);
        }
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy password: ', err);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-200">
            <div className="h-56 w-64 flex flex-col justify-center items-center text-center border-2 border-transparent rounded-lg bg-black text-green-600 shadow-lg p-4">
                <h1 className="text-lg uppercase mb-6">Password Generator</h1>
                <input
                    type="text"
                    id="password"
                    value={password}
                    placeholder="password"
                    readOnly
                    className="w-full h-8 mb-4 px-2 border border-white rounded-md bg-transparent text-white placeholder-white"
                />
                <div className="flex justify-between w-4/5">
                    <button
                        className="w-20 font-semibold border-2 border-green-600 text-green-600 rounded-full p-1 transition duration-500 ease-in-out hover:bg-green-600 hover:text-black"
                        onClick={genPassword}
                    >
                        Generate
                    </button>
                    <button
                        className="w-20 font-semibold border-2 border-green-600 text-green-600 rounded-full p-1 transition duration-500 ease-in-out hover:bg-green-600 hover:text-black"
                        onClick={copyPassword}
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
