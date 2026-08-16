const gadgets = [ 
  { 
    id: 'g1', 
    name: 'Noise Cancelling Headphones', 
    category: 'Audio', 
    condition: 'New', 
    description: 'Wireless headphones for focused work.' 
  }, 
  { 
    id: 'g2', 
    name: 'Portable Power Bank', 
    category: 'Power', 
    condition: 'Used', 
    description: 'Compact power bank for charging devices.' 
  } 
]; 
  
const getAllGadgets = (req, res) => { 
  const safeGadgets = gadgets.map(({ id, name, category, condition }) => 
({ 
    id, 
    name, 
    category, 
    condition 
  })); 
  
  res.status(200).json({ 
    count: safeGadgets.length, 
    data: safeGadgets 
     }); 
}; 
  
const getGadgetById = (req, res) => { 
  const { id } = req.params; 
  
  if (!/^[a-zA-Z0-9-]+$/.test(id)) { 
    return res.status(400).json({ error: 'Invalid gadget ID format' }); 
  } 
  
  const gadget = gadgets.find((item) => item.id === id); 
  
  if (!gadget) { 
    return res.status(404).json({ error: 'Gadget not found' }); 
  } 
  
  res.status(200).json({ data: gadget }); 
}; 
  
const createGadget = (req, res) => { 
  const { name, category, condition, description } = req.body; 
  
  const newGadget = { 
    id: `g${gadgets.length + 1}`, 
    name, 
    category, 
    condition, 
    description 
  }; 
  
  gadgets.push(newGadget); 
  
  res.status(201).json({ 
    message: 'Gadget created', 
    data: newGadget 
  }); 
}; 
  
module.exports = { 
  getAllGadgets, 
  getGadgetById, 
  createGadget 
}; 