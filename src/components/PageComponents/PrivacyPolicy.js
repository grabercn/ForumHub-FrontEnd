import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container p={2}>
            <a href="/">Go back</a>
            <Typography variant="h1">Privacy Policy for ForumHub</Typography>
            <Typography variant="body1" paragraph>
                Last updated: 8/2/2024
            </Typography>
            <Typography variant="h2">Introduction</Typography>
            <Typography variant="body1" paragraph>
                Welcome to ForumHub. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </Typography>
            <Typography variant="h2">Information We Collect</Typography>
            <Typography variant="h3">Personal Information</Typography>
            <Typography variant="body1" paragraph>
                We collect personal information that you voluntarily provide to us when you register on our site, post content, or interact with our services. This may include your name, email address, and other contact details.
            </Typography>
            <Typography variant="h3">Usage Data</Typography>
            <Typography variant="body1" paragraph>
                We may collect information about your interactions with our website, such as your IP address, browser type, operating system, and pages visited. This information helps us improve our services and understand how our website is used. 
                Please note that this program does not store any valuable data. We only collect and use information necessary for the operation of our services.
            </Typography>
            <Typography variant="h2">How We Use Your Information</Typography>
            <Typography variant="body1" paragraph>
                We use the information we collect for various purposes, including:
            </Typography>
            <Typography variant="body1" paragraph>
                <ul>
                    <li>To provide and maintain our services</li>
                    <li>To notify you about changes to our services</li>
                    <li>To monitor the usage of our services</li>
                    <li>To detect, prevent, and address technical issues</li>
                    <li>To provide customer support</li>
                </ul>
            </Typography>
            <Typography variant="h2">Data Sharing and Disclosure</Typography>
            <Typography variant="body1" paragraph>
                We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share your information with:
            </Typography>
            <Typography variant="body1" paragraph>
                <ul>
                    <li>Service providers who assist us in operating our website and providing our services</li>
                    <li>Law enforcement or government agencies if required by law or to protect our rights</li>
                    <li>Third parties in connection with a business transfer, such as a merger or acquisition</li>
                </ul>
            </Typography>
            <Typography variant="h2">Your Rights and Choices</Typography>
            <Typography variant="body1" paragraph>
                You have the right to access, correct, or delete your personal information. You can contact us below if you believe you need to do this. You may also opt out of receiving marketing communications from us at any time by following the instructions in those communications.
            </Typography>
            <Typography variant="h2">Security</Typography>
            <Typography variant="body1" paragraph>
                We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure.
            </Typography>
            <Typography variant="h2">Children's Privacy</Typography>
            <Typography variant="body1" paragraph>
                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
            </Typography>
            <Typography variant="h2">Changes to This Privacy Policy</Typography>
            <Typography variant="body1" paragraph>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. You are advised to review this policy periodically for any changes.
            </Typography>
            <Typography variant="h2">Contact Us</Typography>
            <Typography variant="body1" paragraph>
                If you have any questions about this Privacy Policy, please contact us at:
            </Typography>
            <Typography variant="body1" paragraph>
                Email: grabercn@mail.uc.edu
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
