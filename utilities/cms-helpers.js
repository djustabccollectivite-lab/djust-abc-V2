const mappingComponentSlide__Storyblok = {
    ImageUrl: 'image',
    Text: 'titre',
    Button: 'button',
};

const mappingComponentSlide__Strapi = {
    ImageUrl: 'Image.url',
    Text: 'titre',
};

export function formatCmsStoryBlok(payload) {
    const mappingComponent = {
        slider: 'component.slider',
    };
    payload.story.content.body.forEach((component) => {
        (component.__component = mappingComponent[component.component]),
            component.component === 'slider'
                ? (component.Slide = formatSlideComponent(component.slide, mappingComponentSlide__Storyblok))
                : null;
    });
    return payload.story.content.body;
}

function formatSlideComponent(slides, mappingTable) {
    const slides_ = [];
    slides.forEach((slide) => {
        const formatedSlide = {};
        for (const [key, value] of Object.entries(mappingTable)) {
            formatedSlide[key] = slide[value];
        }
        slides_.push(formatedSlide);
    });
    return slides_;
}
