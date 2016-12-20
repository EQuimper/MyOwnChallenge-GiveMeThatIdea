import Category from './model';

export const getAll = (req, res) => {
  Category.find({})
    .then(
      categories => {
        return res.status(200).json({ success: true, categories });
      },
      error => res.status(400).json({ success: false, error })
    );
};
