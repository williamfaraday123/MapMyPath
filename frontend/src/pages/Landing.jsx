import React, { useEffect, useState } from "react";
import SortFilter from "../components/SortFilter";

const Landing = () => {
    const [textColor, setTextColor] = useState("black");

    const getBackgroundBrightness = (rgb) => {
        // Calculate brightness using luminance formula
        const brightness = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
        return brightness;
    };

    const getDominantColor = (imageElement) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set canvas dimensions to match the image
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;

        // Draw the image onto the canvas
        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        // Define the size of the center region to analyze
        const centerWidth = 179.333; // Width of the center region
        const centerHeight = 366.531; // Height of the center region

        // Calculate the starting point for the center region
        const startX = (canvas.width - centerWidth) / 2;
        const startY = (canvas.height - centerHeight) / 2;

        // Get the image data for the center region
        const imageData = context.getImageData(startX, startY, centerWidth, centerHeight).data;

        // Calculate the average color of the center region
        let totalR = 0, totalG = 0, totalB = 0;
        for (let i = 0; i < imageData.length; i += 4) {
            totalR += imageData[i];
            totalG += imageData[i + 1];
            totalB += imageData[i + 2];
        }

        const pixelCount = imageData.length / 4;
        const avgR = Math.round(totalR / pixelCount);
        const avgG = Math.round(totalG / pixelCount);
        const avgB = Math.round(totalB / pixelCount);

        return [avgR, avgG, avgB];
    };

    useEffect(() => {
        const img = new Image();
        img.src = "https://picsum.photos/1920/1080"; // Background image URL
        img.crossOrigin = "Anonymous"; // Allow cross-origin image loading

        img.onload = () => {
            // Get the dominant color from the center of the image
            const dominantColor = getDominantColor(img);

            // Calculate brightness of the dominant color
            const brightness = getBackgroundBrightness(dominantColor);

            // Set text color based on brightness threshold
            setTextColor(brightness > 0.66 ? "black" : "white");
        };
    }, []);

    return (
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                backgroundImage: "url('https://picsum.photos/2000/1000')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: textColor, // Dynamically set the text color
            }}
        >
            <SortFilter />
        </div>
    );
};

export default Landing;