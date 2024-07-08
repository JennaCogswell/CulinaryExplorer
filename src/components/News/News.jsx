/**
 * @author Ayush Amrishbhai Patel
 * @BannerId B00855591
 */

import React from "react";
import Image from "next/image";
import news_image from "@/images/card.jpg"

const News = () => {
    const newsBackGround = {
        backgroundColor: "#A3865E",
    };

    const attributeLink = (
        <a
          href="https://www.freepik.com/free-ai-image/one-man-holding-basket-fresh-vegetables-generated-by-ai_42328452.htm"
          className="absolute bottom-0 right-2 text-white opacity-40"
        >
          Image By freepik
        </a>
      );

    return(
        <div className="rounded-3xl p-5 m-5" style={newsBackGround}>
            <h2 className="text-2xl mb-3 text-white" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                    <div className="h-60 relative">
                        <Image
                            src={news_image}
                            alt="News Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        {attributeLink}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque aliquam aliquam. Aenean scelerisque felis quam, at euismod magna malesuada id.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                    <div className="h-60 relative">
                        <Image
                            src={news_image}
                            alt="News Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        {attributeLink}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white text-gray-700">Proin ullamcorper luctus luctus. Suspendisse eu dictum justo. Suspendisse at sapien posuere, dictum est eu, suscipit neque.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                    <div className="h-60 relative">
                        <Image
                            src={news_image}
                            alt="News Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        {attributeLink}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white text-gray-700"> Phasellus sollicitudin neque quis eros consequat, quis pulvinar ipsum rutrum.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative h-40">
                    <div className="h-full relative">
                        <Image
                            src={news_image}
                            alt="News Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        {attributeLink}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white text-gray-700">Phasellus erat urna, placerat vitae iaculis nec, bibendum ut velit. Fusce imperdiet dui a pretium commodo. In eros dui, suscipit id rutrum eget, molestie et orci.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative h-40">
                    <div className="h-full relative">
                        <Image
                            src={news_image}
                            alt="News Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        {attributeLink}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white text-gray-700">Ut id nunc justo. Vestibulum mattis sem non pellentesque ultrices.</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative h-40">
                    <div className="h-full relative">
                        <Image
                            src={news_image}
                            alt="News Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                        {attributeLink}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white text-gray-700">Donec ac volutpat lacus. Nam sem nunc, pharetra feugiat magna pretium, luctus mollis massa.</p>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default News;