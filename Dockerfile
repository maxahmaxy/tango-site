# Use nginx alpine for small image size
FROM nginx:alpine

# Copy your website files to nginx's default serve directory
COPY index.html /usr/share/nginx/html/
COPY about.html /usr/share/nginx/html/
COPY contact.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY tango-hero.jpg /usr/share/nginx/html/
COPY FB_IMG_1732874487113.jpg /usr/share/nginx/html/
COPY files/ /usr/share/nginx/html/files/

# Expose port 80
EXPOSE 80

# nginx starts automatically, no CMD needed
