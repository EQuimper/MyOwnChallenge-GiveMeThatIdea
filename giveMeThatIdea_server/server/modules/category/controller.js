import Category from './model';

// TODO: ADD ROLE SECURITY

export const getAll = (req, res) => {
  Category.find({})
    .then(
      categories => res.status(200).json({ success: true, categories }),
      error => res.status(400).json({ success: false, error })
    );
};

export const createOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ success: false, message: 'Name is Required!' });
  }

  const newCategory = new Category({ name });

  newCategory.save()
    .then(
      category => res.status(201).json({ success: true, category }),
      error => res.status(422).json({ success: false, error })
    );
};

export const getAllIdeas = (req, res) => {
  Category.find({})
    .populate('ideas')
    .then(
      categories => res.status(200).json({ success: true, categories }),
      error => res.status(400).json({ success: false, error })
    );
};

// export const getOne = (req, res) => {
//   Category.findOne({ name: req.})
// }
