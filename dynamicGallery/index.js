class galleryImage {
    constructor(widthImage, heightImage) {
        this.width = widthImage;
        this.image = heightImage;
    }

    createImg(index) {
        const image = new Image();
        image.src = `https://picsum.photos/400?random=${index}`;
        return image;
    }
}
class imageContainer {
    constructor(container, numberOfImages) {
        this.container = container;
        this.numberOfImgs = numberOfImages;
    }
	
    displayImg(i = 0) {
        if (i === this.numberOfImgs) return;
        let img = new galleryImage().createImg(i);
        img.addEventListener('load', () => {
            this.container.appendChild(img);
            this.displayImg(++i);
        });
    }
}
const container = document.querySelector('.container');
const gallery = new imageContainer(container, 9);
gallery.displayImg();