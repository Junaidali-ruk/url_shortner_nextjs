"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Shorten = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [generatedUrls, setGeneratedUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    // Retrieve saved URLs from localStorage on component mount
    useEffect(() => {
        const savedUrls = JSON.parse(localStorage.getItem("generatedUrls")) || [];
        setGeneratedUrls(savedUrls);
    }, []);

    const generate = () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            url: url,
            shorturl: shortUrl,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const newGeneratedUrl = `${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`;

                // Add the new URL to the array of URLs and update state
                const updatedUrls = [...generatedUrls, newGeneratedUrl];
                setGeneratedUrls(updatedUrls);

                // Save the updated array to localStorage
                localStorage.setItem("generatedUrls", JSON.stringify(updatedUrls));

                // Reset input fields
                setUrl("");
                setShortUrl("");
                alert(result.message);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    // Delete a URL from the list and update localStorage
    const deleteUrl = (urlToDelete) => {
        const updatedUrls = generatedUrls.filter((url) => url !== urlToDelete);
        setGeneratedUrls(updatedUrls);
        localStorage.setItem("generatedUrls", JSON.stringify(updatedUrls));
    };

    return (
        <div className="mx-auto max-w-lg bg-gradient-to-r from-purple-300 to-purple-100 my-16 p-10 rounded-lg flex flex-col gap-6 shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <h1 className="font-bold text-3xl text-purple-800 text-center animate-fade-in">
                Generate your short URLs
            </h1>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    value={url}
                    className="px-4 py-3 focus:outline-none rounded-md text-gray-700 bg-white border border-purple-200 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    placeholder="Enter your URL"
                    onChange={(e) => setUrl(e.target.value)}
                />

                <input
                    type="text"
                    value={shortUrl}
                    className="px-4 py-3 focus:outline-none rounded-md text-gray-700 bg-white border border-purple-200 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    placeholder="Enter your preferred short URL text"
                    onChange={(e) => setShortUrl(e.target.value)}
                />

                <button
                    onClick={generate}
                    className="bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg shadow-md py-3 font-bold text-white flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="border-t-4 border-white w-5 h-5 rounded-full animate-spin"></div>
                    ) : (
                        "Generate"
                    )}
                </button>
            </div>

            {generatedUrls.length > 0 && (
                <div className="mt-6">
                    <span className="font-bold text-lg text-purple-700">Your Links:</span>
                    <div className="space-y-2 mt-2">
                        {generatedUrls.map((link, index) => (
                            <div key={index} className="flex items-center gap-2 bg-purple-100 p-2 rounded-md shadow-inner">
                                <code className="text-purple-600">
                                    <Link href={link} target="_blank" className="underline hover:text-purple-800">
                                        {link}
                                    </Link>
                                </code>
                                <button
                                    onClick={() => deleteUrl(link)}
                                    className="text-red-500 hover:text-red-700 font-bold ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shorten;
