// ... (imports)

const handleSave = () => {
  let newAddressId = '';
  if (editingAddress) {
    // Update existing address
    setAddresses(prev => prev.map(addr => 
      addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr
    ));
    newAddressId = editingAddress.id;
  } else {
    // Add new address
    const newAddress = {
      ...formData,
      id: Date.now().toString()
    };
    setAddresses(prev => [...prev, newAddress]);
    newAddressId = newAddress.id;
  }
  
  if (formData.isDefault) {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === newAddressId
    })));
  }
  
  setIsModalOpen(false);
};

// ... (rest of the component)