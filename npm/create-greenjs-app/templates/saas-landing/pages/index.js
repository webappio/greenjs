import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Navbar } from "../common/Navbar";
import { PlaceholderImage } from "../common/placeholder-image";
import { COLOURS } from "../mui-theme";
import "./index.css";
import { FEATURES, TESTIMONIALS } from "../data";
import { FeatureCard } from "../common/FeatureCard";
import { TestimonialCard } from "../common/TestimonialCard";
import { Footer } from "../common/Footer";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";


const CAROUSEL_PLUGINS = [
    'infinite',
    'arrows',
{
    resolve: slidesToShowPlugin,
    options: {
        numberOfSlides: 2,
    }
}];

const CAROUSEL_BREAKPOINTS = {
    1000: {
        plugins: [
            'infinite',
            'arrows',
            {
                resolve: slidesToShowPlugin,
                options: {
                    numberOfSlides: 1,
                }
            }
        ]
    }
};

const Index = () => {
    return (
        <div>
        <Navbar />

        {/* HEADER */}
        <div className="container">
            <div className="Hero--Div">
                <div className="Hero--Text--Div">
                    <Typography variant="h1" fontWeight="600">
                        Build <span style={{ color: COLOURS.PRIMARY }}>blazingly fast</span> React apps
                    </Typography>
                    <div style={{ marginTop: "20px" }}>
                        <Typography variant="h4">
                            Create a SaaS landing page in seconds by cloning this project and adding your text.
                        </Typography>
                    </div>
                </div>
                <div className="Hero--Image--Div">
                    <PlaceholderImage height="50vh" width="100%" text="Your Hero Image Here" />
                </div>
            </div>
        </div>

        {/* MORE INFORMATION */}
        <div className="container">
            <div className="MoreInfo--Div">
                <div>
                    <Typography variant="h4">
                        Create a SaaS Landing Page in Seconds
                    </Typography>
                </div>
                <div className="MoreInfo--Main">
                    <div className="MoreInfo--Main--Images">
                        <div>
                            <PlaceholderImage height="250px" width="200px" text="Image 1" />
                        </div>
                        <div className="MoreInfo--Main--Image--Stacked">
                            <PlaceholderImage height="300px" width="200px" text="Image 2" style={{ marginBottom: "10px" }} />
                            <PlaceholderImage height="200px" width="200px" text="Image 3" />
                        </div>
                    </div>
                    <div className="MoreInfo--Main--Text">
                        <Typography variant="h4" fontWeight="bold" style={{ marginBottom: "20px" }}>
                        Create a SaaS Landing Page in Seconds
                        </Typography>
                        <Typography variant="h5" fontWeight="normal">
                        Here’s some more text you can edit for your landing page, with three smaller images on the left.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>

        {/* IMAGE */}
        <div className="LargeImage">
            <div className="LargeImage--Div">
            <PlaceholderImage width="100%" height="100%" text="Picture of your product" />
            </div>
        </div>

        {/* FEATURES */}
        <div className="FeatureCard--Div">
            <div style={{ textAlign: "center" }}>
                <Typography variant="h4">
                    Using this template:
                </Typography>
            </div>
            <div className="Carousel--ContainerDiv">
            <div className="Carousel--Container FeatureCards">
            {
                FEATURES.map((feature, index) => (
                    <FeatureCard 
                        key={`${feature.title}_${index}`}
                        title={feature.title}
                        description={feature.description}
                        link={feature.link}
                        linkText={feature.linkText}
                    />
                ))
            }
            </div>
            </div>
        </div>


        {/* TESTIMONIALS */}
        <div className="Testimonials--Div">
            <div style={{ textAlign: "center" }}>
                <Typography variant="h4">
                    Testimonials:
                </Typography>
            </div>
            <div className="Carousel--ContainerDiv">
                <div className="Carousel--Container">
                <div className="Testimonials">
                <Carousel 
                plugins={CAROUSEL_PLUGINS}
                breakpoints={CAROUSEL_BREAKPOINTS}
                >
                {
                    TESTIMONIALS.map((test, index) => (
                        <TestimonialCard
                            key={`${test.company}_${index}`}
                            testimonial={test.testimonial}
                            firstName={test.firstName}
                            lastName={test.lastName}
                            title={test.title}
                            company={test.company}
                        />
                    ))
                }
                </Carousel>
                </div>
                </div>
            </div>
        </div>

        {/* IMAGE 2 */}
        <div className="LargeImage">
            <div className="LargeImage--Div">
            <PlaceholderImage width="100%" height="100%" text="Picture of your product" />
            </div>
        </div>
        <div className="CTA">
            <Button 
            className="CTA--Button"
            size="large" variant="contained" color="primary">
                CONTACT SALES
            </Button>
            <Button 
            className="CTA--Button"
            size="large" variant="contained" color="secondary">
                GET A DEMO
            </Button>
        </div>

        <Footer />

        </div>
    )
}

export default Index;