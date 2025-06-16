import React from 'react';
import { Shield, Book, Scale } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <Scale className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of <span className="text-blue-600">Use</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-8 leading-relaxed">
              The Educamy platform is a web-based solution for the automation and management of educational processes and data. It is a service provided and operated by <strong>Educamy</strong>, with its registered office at [Insert Registered Office Address].
            </p>

            {/* Definition Clause */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Book className="h-6 w-6 text-blue-600 mr-3" />
                Definition Clause
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li><strong>"User"</strong> refers to any person accessing or using Educamy services, regardless of whether they are a paid subscriber, guest, or registered member.</li>
                <li><strong>"Paid Services"</strong> refers to any premium or subscription-based services offered by Educamy.</li>
                <li><strong>"Third Party"</strong> refers to any external application, module, individual, or entity other than Educamy and the User.</li>
              </ul>
            </section>

            {/* General Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">General Terms</h2>
              <ul className="list-decimal pl-6 space-y-3 text-gray-600">
                <li>By using Educamy, you agree to be bound by these Terms. Continued use of the Platform indicates acceptance.</li>
                <li>Users must fully read and understand these Terms before proceeding with any services.</li>
                <li>Services are intended solely for educational institutions and individuals legally authorized to use them within India.</li>
                <li>Educamy reserves the right to change these Terms at any time. Updated Terms will be posted on this page and take effect immediately upon posting.</li>
                <li>Users agree to abide by all copyright, proprietary, and legal restrictions outlined in these Terms.</li>
                <li>Communication may be conducted via phone, email, or other official means.</li>
              </ul>
            </section>

            {/* User Generality */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Generality</h2>
              <ul className="list-[lower-alpha] pl-6 space-y-3 text-gray-600">
                <li>Users must be legally eligible to use Educamy. If a minor uses the service, parental or guardian consent and responsibility is required.</li>
                <li>All registration information must be true, complete, and kept up to date by the User.</li>
                <li>Users shall not replicate, resell, distribute, or exploit the platform for unauthorized commercial purposes.</li>
                <li>Educamy reserves the right to modify or remove services at any time without notice.</li>
                <li>Hacking, reverse engineering, and unauthorized access attempts are strictly prohibited.</li>
                <li>Users are expected to review and adhere to the Privacy Policy regularly.</li>
                <li>Account sharing or transfer without written approval is not permitted.</li>
              </ul>
            </section>

            {/* Payment */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
              <ul className="list-decimal pl-6 space-y-3 text-gray-600">
                <li>Access to certain features may require subscription or one-time payments.</li>
                <li>Failure to make timely payments may result in service termination or suspension.</li>
                <li>Educamy reserves the right to revise pricing or billing terms with prior notice.</li>
                <li>Refunds will not be issued once payment is processed, except where legally mandated.</li>
              </ul>
            </section>

            {/* Intellectual Property Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property Rights</h2>
              <ul className="list-decimal pl-6 space-y-3 text-gray-600">
                <li>Users retain full rights to content they upload, but agree not to upload or share infringing materials.</li>
                <li>Educamy owns all rights to its trademarks, logos, and branding elements.</li>
                <li>Unauthorized use of Educamy's branding or platform content is prohibited.</li>
                <li>Users are responsible for any legal liabilities arising from violations of IP rights.</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              <ul className="list-decimal pl-6 space-y-3 text-gray-600">
                <li>The platform is provided "as-is" and "as-available" without warranties.</li>
                <li>Educamy does not guarantee uninterrupted or error-free service.</li>
                <li>Educamy is not liable for data loss, business interruption, or damages arising from use or inability to use the services.</li>
              </ul>
            </section>

            {/* Indemnity */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Indemnity</h2>
              <p className="text-gray-600">
                Users agree to indemnify and hold Educamy and its affiliates harmless from claims, losses, and liabilities arising from their use of the platform or breach of the Terms.
              </p>
            </section>

            {/* Termination of Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Termination of Services</h2>
              <ul className="list-decimal pl-6 space-y-3 text-gray-600">
                <li>Users may terminate services at any time by notifying Educamy.</li>
                <li>Educamy reserves the right to suspend or terminate access without prior notice for violation of Terms or misuse.</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law and Jurisdiction</h2>
              <p className="text-gray-600">
                This agreement shall be governed by and interpreted under the laws of India. Any legal proceedings shall be conducted in the jurisdiction of [Insert Your Legal Jurisdiction, e.g., courts of Delhi].
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;