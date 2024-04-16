import React from 'react';

function AboutPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p>Welcome to Food Truck App!!!!</p>
      <p>We're passionate about connecting food lovers with the best local food trucks in town. Whether you're craving tacos, burgers, sushi, or something sweet, our app makes it easy to find delicious meals on wheels near you.</p>

      <h2 style={styles.subheading}>Our Mission</h2>
      <p>Our mission is simple: to bring together food trucks and hungry customers in a convenient and enjoyable way. We strive to support local businesses and provide users with a seamless and satisfying dining experience, right from their smartphones.</p>

      <h2 style={styles.subheading}>How It Works</h2>
      <p>Using Food Truck App is easy! Simply download the app, browse through a curated selection of food trucks in your area, check out their menus and reviews, and place your order with just a few taps. No more waiting in long lines or wandering the streets in search of your next meal – we've got you covered.</p>

      <h2 style={styles.subheading}>Why Choose Us</h2>
      <ul>
        <li style={styles.listItem}><strong>Variety:</strong> With a diverse range of food trucks on our platform, there's something for everyone to enjoy.</li>
        <li style={styles.listItem}><strong>Convenience:</strong> Skip the lines and order ahead with our user-friendly app.</li>
        <li style={styles.listItem}><strong>Community:</strong> We're dedicated to fostering a vibrant food truck community and supporting local entrepreneurs.</li>
        <li style={styles.listItem}><strong>Quality:</strong> We handpick each food truck to ensure that only the best vendors are featured on our platform.</li>
      </ul>

      <h2 style={styles.subheading}>Get in Touch</h2>
      <p>Have questions or feedback? We'd love to hear from you! Reach out to our team at <a href="mailto:contact@yourfoodtruckapp.com">contact@yourfoodtruckapp.com</a> or connect with us on social media <a href="https://www.twitter.com/YourFoodTruckApp">@YourFoodTruckApp</a>.</p>

      <p style={styles.paragraph}>Join the Food Truck App community today and embark on a culinary adventure right in your own neighborhood!</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '30px',
    marginBottom: '10px',
  },
  listItem: {
    marginBottom: '10px',
  },
  paragraph: {
    marginTop: '30px',
  }
};

export default AboutPage;
