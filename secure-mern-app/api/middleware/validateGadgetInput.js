const allowedConditions = ['New', 'Used', 'Refurbished']; 

const validateGadgetInput = (req, res, next) => { 
    const { name, category, condition, description } = req.body;

    if (!name || !category || !condition || !description) { 
        return res.status(400).json({ error: 'All fields are required' }); 
    } 
    if ( 
        typeof name !== 'string' || 
        typeof category !== 'string' || 
        typeof condition !== 'string' || 
        typeof description !== 'string'
  ) { 
    return res.status(400).json({ error: 'All fields must be text values' 
}); 
  } 
  
  const trimmedName = name.trim(); 
  const trimmedCategory = category.trim(); 
  const trimmedCondition = condition.trim(); 
  const trimmedDescription = description.trim(); 
  
  if (trimmedName.length < 2 || trimmedName.length > 60) { 
    return res.status(400).json({ error: 'Name must be between 2 and 60 characters' }); 
  } 
  
  if (trimmedCategory.length < 2 || trimmedCategory.length > 40) { 
    return res.status(400).json({ error: 'Category must be between 2 and 40 characters' }); 
  } 
  
  if (!allowedConditions.includes(trimmedCondition)) { 
    return res.status(400).json({ error: 'Condition must be New, Used, or Refurbished' }); 
  } 
  
  if (trimmedDescription.length < 5 || trimmedDescription.length > 250) 
{ 
    return res.status(400).json({ error: 'Description must be between 5 and 250 characters' }); 
  } 
  
  req.body = { 
    name: trimmedName, 
    category: trimmedCategory, 
    condition: trimmedCondition, 
    description: trimmedDescription 
  }; 
  
  next(); 
}; 
  
module.exports = validateGadgetInput;