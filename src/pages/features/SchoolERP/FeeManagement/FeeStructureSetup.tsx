import React, { useState, useEffect } from 'react';
import { Home, LayoutTemplate as Template, Settings } from 'lucide-react';
import { 
  Calculator, Book, Users, Plus, Edit, Trash2, Search,
  Download, Upload, Filter, Percent, Calendar, Save, X
} from 'lucide-react';
import BackButton from '../../../../components/BackButton';

interface FeeCategory {
  id: number;
  name: string;
  amount: number;
  frequency: string;
  applicableClasses: string[];
  createdAt: Date;
}

interface Discount {
  id: number;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  applicableTo: string[];
  criteria: string;
  validFrom: Date;
  validUntil: Date;
}

interface FeeTemplate {
  id: number;
  name: string;
  description: string;
  categories: number[];
  discounts: number[];
  applicableClasses: string[];
  academicYear: string;
}

const FeeStructureSetup: React.FC = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState<'categories' | 'discounts' | 'templates'>('categories');
  
  // Fee Categories state
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([
    { id: 1, name: 'Tuition Fee', amount: 5000, frequency: 'Monthly', applicableClasses: ['Class I', 'Class II', 'Class III'], createdAt: new Date() },
    { id: 2, name: 'Development Fee', amount: 10000, frequency: 'Annual', applicableClasses: ['Class I', 'Class II', 'Class III', 'Class IV'], createdAt: new Date() },
    { id: 3, name: 'Library Fee', amount: 2000, frequency: 'Quarterly', applicableClasses: ['Class I', 'Class II'], createdAt: new Date() },
  ]);
  
  // Discounts state
  const [discounts, setDiscounts] = useState<Discount[]>([
    { 
      id: 1, 
      name: 'Sibling Discount', 
      type: 'percentage', 
      value: 10, 
      applicableTo: ['Tuition Fee'], 
      criteria: 'For families with more than one child enrolled', 
      validFrom: new Date(2023, 0, 1), 
      validUntil: new Date(2023, 11, 31) 
    },
    { 
      id: 2, 
      name: 'Early Payment Discount', 
      type: 'percentage', 
      value: 5, 
      applicableTo: ['All Fees'], 
      criteria: 'For fees paid before due date', 
      validFrom: new Date(2023, 0, 1), 
      validUntil: new Date(2023, 11, 31) 
    },
  ]);
  
  // Fee Templates state
  const [feeTemplates, setFeeTemplates] = useState<FeeTemplate[]>([
    { 
      id: 1, 
      name: 'Standard Fee Package 2023-24', 
      description: 'Standard fee structure for all classes', 
      categories: [1, 2, 3], 
      discounts: [1, 2], 
      applicableClasses: ['Class I', 'Class II', 'Class III', 'Class IV'], 
      academicYear: '2023-24' 
    },
  ]);
  
  // Form states
  const [categoryForm, setCategoryForm] = useState<Omit<FeeCategory, 'id' | 'createdAt'>>({ 
    name: '', 
    amount: 0, 
    frequency: 'Monthly', 
    applicableClasses: [] 
  });
  
  const [discountForm, setDiscountForm] = useState<Omit<Discount, 'id'>>({ 
    name: '', 
    type: 'percentage', 
    value: 0, 
    applicableTo: [], 
    criteria: '', 
    validFrom: new Date(), 
    validUntil: new Date(new Date().getFullYear(), 11, 31) 
  });
  
  const [templateForm, setTemplateForm] = useState<Omit<FeeTemplate, 'id'>>({ 
    name: '', 
    description: '', 
    categories: [], 
    discounts: [], 
    applicableClasses: [], 
    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}` 
  });
  
  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  
  // Edit states
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingDiscountId, setEditingDiscountId] = useState<number | null>(null);
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(null);
  
  // Search and filter states
  const [categorySearch, setCategorySearch] = useState('');
  const [discountSearch, setDiscountSearch] = useState('');
  const [templateSearch, setTemplateSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Load form data when editing
  useEffect(() => {
    if (editingCategoryId) {
      const category = feeCategories.find(c => c.id === editingCategoryId);
      if (category) {
        setCategoryForm({
          name: category.name,
          amount: category.amount,
          frequency: category.frequency,
          applicableClasses: [...category.applicableClasses]
        });
        setShowCategoryModal(true);
      }
    }
  }, [editingCategoryId, feeCategories]);
  
  useEffect(() => {
    if (editingDiscountId) {
      const discount = discounts.find(d => d.id === editingDiscountId);
      if (discount) {
        setDiscountForm({
          name: discount.name,
          type: discount.type,
          value: discount.value,
          applicableTo: [...discount.applicableTo],
          criteria: discount.criteria,
          validFrom: new Date(discount.validFrom),
          validUntil: new Date(discount.validUntil)
        });
        setShowDiscountModal(true);
      }
    }
  }, [editingDiscountId, discounts]);
  
  useEffect(() => {
    if (editingTemplateId) {
      const template = feeTemplates.find(t => t.id === editingTemplateId);
      if (template) {
        setTemplateForm({
          name: template.name,
          description: template.description,
          categories: [...template.categories],
          discounts: [...template.discounts],
          applicableClasses: [...template.applicableClasses],
          academicYear: template.academicYear
        });
        setShowTemplateModal(true);
      }
    }
  }, [editingTemplateId, feeTemplates]);
  
  // Handler functions for categories
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategoryId) {
      // Update existing category
      setFeeCategories(prev => 
        prev.map(category => 
          category.id === editingCategoryId ? 
          { ...category, ...categoryForm } : 
          category
        )
      );
      setEditingCategoryId(null);
    } else {
      // Add new category
      const newCategory: FeeCategory = {
        ...categoryForm,
        id: Date.now(),
        createdAt: new Date()
      };
      setFeeCategories(prev => [...prev, newCategory]);
    }
    
    // Reset form and close modal
    setCategoryForm({ name: '', amount: 0, frequency: 'Monthly', applicableClasses: [] });
    setShowCategoryModal(false);
  };
  
  const handleDeleteCategory = (id: number) => {
    setFeeCategories(prev => prev.filter(category => category.id !== id));
  };
  
  // Handler functions for discounts
  const handleDiscountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDiscountId) {
      // Update existing discount
      setDiscounts(prev => 
        prev.map(discount => 
          discount.id === editingDiscountId ? 
          { ...discount, ...discountForm } : 
          discount
        )
      );
      setEditingDiscountId(null);
    } else {
      // Add new discount
      const newDiscount: Discount = {
        ...discountForm,
        id: Date.now()
      };
      setDiscounts(prev => [...prev, newDiscount]);
    }
    
    // Reset form and close modal
    setDiscountForm({ 
      name: '', 
      type: 'percentage', 
      value: 0, 
      applicableTo: [], 
      criteria: '', 
      validFrom: new Date(), 
      validUntil: new Date(new Date().getFullYear(), 11, 31) 
    });
    setShowDiscountModal(false);
  };
  
  const handleDeleteDiscount = (id: number) => {
    setDiscounts(prev => prev.filter(discount => discount.id !== id));
  };
  
  // Handler functions for templates
  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTemplateId) {
      // Update existing template
      setFeeTemplates(prev => 
        prev.map(template => 
          template.id === editingTemplateId ? 
          { ...template, ...templateForm } : 
          template
        )
      );
      setEditingTemplateId(null);
    } else {
      // Add new template
      const newTemplate: FeeTemplate = {
        ...templateForm,
        id: Date.now()
      };
      setFeeTemplates(prev => [...prev, newTemplate]);
    }
    
    // Reset form and close modal
    setTemplateForm({ 
      name: '', 
      description: '', 
      categories: [], 
      discounts: [], 
      applicableClasses: [], 
      academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}` 
    });
    setShowTemplateModal(false);
  };
  
  const handleDeleteTemplate = (id: number) => {
    setFeeTemplates(prev => prev.filter(template => template.id !== id));
  };
  
  // Filter and search functions
  const filteredCategories = feeCategories
    .filter(category => 
      category.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
      category.frequency.toLowerCase().includes(categorySearch.toLowerCase())
    )
    .filter(category => 
      categoryFilter === 'all' || category.frequency === categoryFilter
    );
  
  const filteredDiscounts = discounts
    .filter(discount => 
      discount.name.toLowerCase().includes(discountSearch.toLowerCase()) ||
      discount.criteria.toLowerCase().includes(discountSearch.toLowerCase())
    );
  
  const filteredTemplates = feeTemplates
    .filter(template => 
      template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
      template.description.toLowerCase().includes(templateSearch.toLowerCase()) ||
      template.academicYear.includes(templateSearch)
    );
  
  // Helper function to get category name by id
  const getCategoryNameById = (id: number) => {
    const category = feeCategories.find(c => c.id === id);
    return category ? category.name : 'Unknown';
  };
  
  // Helper function to get discount name by id
  const getDiscountNameById = (id: number) => {
    const discount = discounts.find(d => d.id === id);
    return discount ? discount.name : 'Unknown';
  };
  
  // Import/Export functions
  const handleExportData = () => {
    const data = {
      feeCategories,
      discounts,
      feeTemplates
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fee_structure_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.feeCategories) setFeeCategories(data.feeCategories);
        if (data.discounts) setDiscounts(data.discounts);
        if (data.feeTemplates) setFeeTemplates(data.feeTemplates);
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Fee Structure Setup</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Fee Types</h3>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{feeCategories.length}</p>
            <p className="text-sm text-gray-500 mt-2">Active Categories</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Classes Configured</h3>
              <Book className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">12</p>
            <p className="text-sm text-gray-500 mt-2">Total Classes</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Discounts</h3>
              <Percent className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{discounts.length}</p>
            <p className="text-sm text-gray-500 mt-2">Discount Schemes</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Fee Templates</h3>
              <Template className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{feeTemplates.length}</p>
            <p className="text-sm text-gray-500 mt-2">Predefined Templates</p>
          </div>
        </div>
        
        {/* Import/Export Buttons */}
        <div className="flex justify-end mb-6 gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
            <Upload className="h-5 w-5" />
            <span>Import</span>
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={handleImportData}
            />
          </label>
          <button 
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'categories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('categories')}
            >
              Fee Categories
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'discounts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('discounts')}
            >
              Discounts
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'templates' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('templates')}
            >
              Fee Templates
            </button>
          </div>
        </div>
        
        {/* Fee Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4 w-1/2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <select
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Frequencies</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annual">Annual</option>
                    <option value="One-time">One-time</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingCategoryId(null);
                  setCategoryForm({ name: '', amount: 0, frequency: 'Monthly', applicableClasses: [] });
                  setShowCategoryModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Category</span>
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicable Classes</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{category.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.frequency}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.applicableClasses.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setEditingCategoryId(category.id)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No fee categories found. Add a new category to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Discounts Tab */}
        {activeTab === 'discounts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search discounts..."
                  value={discountSearch}
                  onChange={(e) => setDiscountSearch(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setEditingDiscountId(null);
                  setDiscountForm({ 
                    name: '', 
                    type: 'percentage', 
                    value: 0, 
                    applicableTo: [], 
                    criteria: '', 
                    validFrom: new Date(), 
                    validUntil: new Date(new Date().getFullYear(), 11, 31) 
                  });
                  setShowDiscountModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Discount</span>
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicable To</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDiscounts.length > 0 ? (
                    filteredDiscounts.map((discount) => (
                      <tr key={discount.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div>{discount.name}</div>
                          <div className="text-xs text-gray-500">{discount.criteria}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {discount.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {discount.type === 'percentage' ? `${discount.value}%` : `₹${discount.value}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {discount.applicableTo.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(discount.validFrom).toLocaleDateString()} - {new Date(discount.validUntil).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setEditingDiscountId(discount.id)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDiscount(discount.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No discounts found. Add a new discount to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Fee Templates Tab */}
        {activeTab === 'templates' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search templates..."
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setEditingTemplateId(null);
                  setTemplateForm({ 
                    name: '', 
                    description: '', 
                    categories: [], 
                    discounts: [], 
                    applicableClasses: [], 
                    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}` 
                  });
                  setShowTemplateModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Template</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-500">{template.academicYear}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTemplateId(template.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="mt-2 text-sm text-gray-600">{template.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Fee Categories:</h4>
                        <ul className="mt-2 space-y-1">
                          {template.categories.map((categoryId) => (
                            <li key={categoryId} className="text-sm text-gray-600">
                              • {getCategoryNameById(categoryId)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Applicable Discounts:</h4>
                        <ul className="mt-2 space-y-1">
                          {template.discounts.map((discountId) => (
                            <li key={discountId} className="text-sm text-gray-600">
                              • {getDiscountNameById(discountId)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Applicable Classes:</h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {template.applicableClasses.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
                  No fee templates found. Add a new template to get started.
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingCategoryId ? 'Edit Fee Category' : 'Add Fee Category'}
                </h2>
                <button 
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="Enter category name" 
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="Enter amount" 
                    value={categoryForm.amount}
                    onChange={(e) => setCategoryForm({...categoryForm, amount: Number(e.target.value)})}
                    required
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={categoryForm.frequency}
                    onChange={(e) => setCategoryForm({...categoryForm, frequency: e.target.value})}
                    required
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annual">Annual</option>
                    <option value="One-time">One-time</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Classes</label>
                  <select 
                    className="w-full p-2 border rounded-lg" 
                    multiple
                    value={categoryForm.applicableClasses}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                      setCategoryForm({...categoryForm, applicableClasses: selectedOptions});
                    }}
                    required
                  >
                    <option value="Class I">Class I</option>
                    <option value="Class II">Class II</option>
                    <option value="Class III">Class III</option>
                    <option value="Class IV">Class IV</option>
                    <option value="Class V">Class V</option>
                    <option value="Class VI">Class VI</option>
                    <option value="Class VII">Class VII</option>
                    <option value="Class VIII">Class VIII</option>
                    <option value="Class IX">Class IX</option>
                    <option value="Class X">Class X</option>
                    <option value="Class XI">Class XI</option>
                    <option value="Class XII">Class XII</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple classes</p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowCategoryModal(false)}
                    className="mr-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingCategoryId ? 'Update' : 'Add'} Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Discount Modal */}
        {showDiscountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingDiscountId ? 'Edit Discount' : 'Add Discount'}
                </h2>
                <button 
                  onClick={() => setShowDiscountModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleDiscountSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="Enter discount name" 
                    value={discountForm.name}
                    onChange={(e) => setDiscountForm({...discountForm, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({...discountForm, type: e.target.value as 'percentage' | 'fixed'})}
                    required
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {discountForm.type === 'percentage' ? 'Percentage Value' : 'Fixed Amount'}
                  </label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder={discountForm.type === 'percentage' ? 'Enter percentage' : 'Enter amount'} 
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({...discountForm, value: Number(e.target.value)})}
                    required
                    min="0"
                    max={discountForm.type === 'percentage' ? '100' : undefined}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicable To</label>
                  <select 
                    className="w-full p-2 border rounded-lg" 
                    multiple
                    value={discountForm.applicableTo}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                      setDiscountForm({...discountForm, applicableTo: selectedOptions});
                    }}
                    required
                  >
                    <option value="All Fees">All Fees</option>
                    {feeCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple categories</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Criteria</label>
                  <textarea 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="Enter eligibility criteria" 
                    value={discountForm.criteria}
                    onChange={(e) => setDiscountForm({...discountForm, criteria: e.target.value})}
                    required
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded-lg" 
                      value={discountForm.validFrom.toISOString().split('T')[0]}
                      onChange={(e) => setDiscountForm({
                        ...discountForm, 
                        validFrom: new Date(e.target.value)
                      })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded-lg" 
                      value={discountForm.validUntil.toISOString().split('T')[0]}
                      onChange={(e) => setDiscountForm({
                        ...discountForm, 
                        validUntil: new Date(e.target.value)
                      })}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowDiscountModal(false)}
                    className="mr-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {editingDiscountId ? 'Update' : 'Add'} Discount
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Template Modal */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingTemplateId ? 'Edit Fee Template' : 'Add Fee Template'}
                </h2>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleTemplateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-lg" 
                      placeholder="Enter template name" 
                      value={templateForm.name}
                      onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-lg" 
                      placeholder="e.g. 2023-24" 
                      value={templateForm.academicYear}
                      onChange={(e) => setTemplateForm({...templateForm, academicYear: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="Enter template description" 
                    value={templateForm.description}
                    onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})}
                    required
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Categories</label>
                    <select 
                      className="w-full p-2 border rounded-lg" 
                      multiple
                      value={templateForm.categories.map(String)}
                      onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
                        setTemplateForm({...templateForm, categories: selectedOptions});
                      }}
                      required
                      size={5}
                    >
                      {feeCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name} - ₹{category.amount} ({category.frequency})</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple categories</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Discounts</label>
                    <select 
                      className="w-full p-2 border rounded-lg" 
                      multiple
                      value={templateForm.discounts.map(String)}
                      onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
                        setTemplateForm({...templateForm, discounts: selectedOptions});
                      }}
                      size={5}
                    >
                      {discounts.map(discount => (
                        <option key={discount.id} value={discount.id}>
                          {discount.name} - {discount.type === 'percentage' ? `${discount.value}%` : `₹${discount.value}`}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple discounts</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Classes</label>
                  <select 
                    className="w-full p-2 border rounded-lg" 
                    multiple
                    value={templateForm.applicableClasses}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                      setTemplateForm({...templateForm, applicableClasses: selectedOptions});
                    }}
                    required
                  >
                    <option value="Class I">Class I</option>
                    <option value="Class II">Class II</option>
                    <option value="Class III">Class III</option>
                    <option value="Class IV">Class IV</option>
                    <option value="Class V">Class V</option>
                    <option value="Class VI">Class VI</option>
                    <option value="Class VII">Class VII</option>
                    <option value="Class VIII">Class VIII</option>
                    <option value="Class IX">Class IX</option>
                    <option value="Class X">Class X</option>
                    <option value="Class XI">Class XI</option>
                    <option value="Class XII">Class XII</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple classes</p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowTemplateModal(false)}
                    className="mr-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    {editingTemplateId ? 'Update' : 'Add'} Template
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeStructureSetup;