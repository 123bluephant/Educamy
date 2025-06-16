import React from 'react';
import { Shield, Lock, Eye, Bell } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect and manage your information.
          </p>
        </div>

        {/* Key Privacy Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Data Security</h3>
            <p className="text-gray-600">Advanced encryption and security measures to protect your information</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">Clear information about how we collect and use your data</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Updates & Notifications</h3>
            <p className="text-gray-600">Regular updates about changes to our privacy practices</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-8 leading-relaxed">
              The Educamy Platform ("Website", "Services") is an electronic web-based platform for the automation and management of data and processes in the education sector. It is a service offered by <strong>Educamy</strong> and operated by its legal entity with its registered office at 123 Education Street, Tech Park, New Delhi, India.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
              <p className="text-gray-700">
                Educamy is dedicated to safeguarding the privacy of its Users. Each User is encouraged to review the following Privacy Policy to gain a comprehensive understanding of how personal and business information will be handled.
              </p>
            </div>

            {/* Sections with enhanced styling */}
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 p-2 rounded-lg mr-3">1</span>
                  Information Collection & Usage
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-600">
                  <li>Information is collected from Users at the time of inquiry or specific transactions where Users are required to provide details such as name, contact information, and/or usage preferences.</li>
                  <li>The data collected is used solely by Educamy, unless explicitly stated otherwise or when shared with the User's consent or with third parties like vendors or government bodies under special conditions.</li>
                  <li>Additional data shared by Users may be used to tailor solutions or services based on their needs and preferences.</li>
                  <li>Cookies and similar technologies may be used to enhance functionality and provide a better User experience.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 p-2 rounded-lg mr-3">2</span>
                  Information Distribution
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-600">
                  <li>Educamy continuously works to enhance the platform by aligning with modern educational needs and technological advancements. To do so, feedback mechanisms such as emails or surveys may be used from time to time.</li>
                  <li>Feedback and improvement suggestions are collected anonymously unless the User chooses to share identifiable information.</li>
                  <li>Only authorized Educamy personnel under strict confidentiality terms are allowed access to sensitive data for service delivery.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 p-2 rounded-lg mr-3">3</span>
                  Information Sharing and Protection
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-600">
                  <li>Educamy will not disclose any personally identifiable information of its Users without consent, except in cases required by legal or regulatory authorities.</li>
                  <li>Disclosure may occur in cooperation with government or legal investigations, especially in cases involving fraud, criminal activity, or misuse of the platform.</li>
                  <li>Educamy does not engage in the sale or rental of personal data to third parties for marketing or solicitation purposes.</li>
                  <li>Users are advised not to share personal information with others while using public computers or networks.</li>
                  <li>While Educamy uses appropriate security practices to protect User data, complete online security cannot be guaranteed. Transmission of data over the internet is done at the User's own risk.</li>
                </ul>
              </section>
            </div>

            {/* Contact Information with enhanced styling */}
            <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-3 gap-6 text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">📞</div>
                  <p>+91 9811249728</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">📧</div>
                  <p>erp@weblink.in</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">🏢</div>
                  <p>123 Education Street, Tech Park, New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;