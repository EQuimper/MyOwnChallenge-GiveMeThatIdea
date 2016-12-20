import Idea from './model';
import { Category } from '../category';

export const asyncIdeaTitle = (req, res) => {
  const { title } = req.body;
  Idea.findOne({ title })
    .then(idea => {
      if (idea) {
        return res.json({ message: 'Title already take, plz be original!', exist: true });
      }
      return res.json({ message: 'Title available', exist: false });
    })
    .catch(err => res.json({ err }));
};

export const createIdea = (req, res) => {
  const { title, description, category, userId } = req.body;

  if (!title) {
    return res.status(422).json({ success: false, message: 'A title is required!' });
  } else if (!description) {
    return res.status(422).json({ success: false, message: 'A description is required!' });
  } else if (!userId) {
    return res.status(422).json({ success: false, message: 'Problem cause no userId!' });
  } else if (!category) {
    return res.status(422).json({ success: false, message: 'Problem cause no category!' });
  }

  Category.findById(category)
    .then(cat => {
      const newIdea = new Idea({ title, description, category: cat._id, author: userId });
      newIdea.save()
        .then(idea => {
          cat.ideas.push(idea);
          cat.save()
            .then(() => {
              return res.status(201).json({ success: true, message: 'Successfully created!', idea });
            });
        })
        .catch(err => {
          let error;
          if (err.code === 11000) {
            error = 'Duplicate idea title, plz provide a other one!';
          }
          return res.status(422).json({ success: false, message: error || err });
        });
    })
    .catch(error => res.status(422).json({ success: false, error }));
};

export const deleteIdea = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  Idea.findById(id)
    .then(idea => {
      if (!userId) {
        return res.status(422).json({ success: false, message: 'Cannot delete need a userId' });
      }

      if (!idea.authorId.equals(userId)) {
        return res.status(401).json({ success: false, message: 'This is not your idea why deleted?' });
      }

      return idea.remove()
        .then(() => res.status(200).json({ success: true, message: 'Successfully deleted!' }))
        .catch(error => res.status(422).json({ success: false, message: 'Cannot deleted!', error }));
    });
};

export const updateIdea = (req, res) => {
  const { id } = req.params;
  const { userId, authorId } = req.body;
  const uIdea = req.body;

  delete uIdea.userId;
  delete uIdea.authorId;

  if (!userId) {
    return res.status(422).json({ success: false, message: 'Cannot update need a userId' });
  } else if (!authorId) {
    return res.status(422).json({ success: false, message: 'Cannot update need a authorId' });
  }

  if (userId !== authorId) {
    return res.status(401).json({ success: false, message: 'This is not your idea why updated?' });
  }

  Idea.findByIdAndUpdate(id, uIdea, { new: true })
    .then(idea => {
      res.status(200).json({ success: true, message: 'Successfully updated!', idea });
    })
    .catch(error => res.status(422).json({ success: false, message: 'Cannot updated!', error }));
};

const unselectAuthor = '-local.password -updatedAt -createdAt -__v -role';
const unselectCategory = '-__V';

export const getAllIdea = (req, res) => {
  Idea
    .find({})
    .sort({ createdAt: -1 })
    .populate('author', unselectAuthor)
    .populate('category', unselectCategory)
    .then(ideas => res.status(200).json({ success: true, ideas }))
    .catch(error => res.status(400).json({ success: false, error }));
};


export const getOneIdea = (req, res) => {
  Idea.findOne({ slug: req.params.slug })
    .populate('author', unselectAuthor)
    .populate('category', unselectCategory)
    .then(
      idea => res.status(200).json({ success: true, idea }),
      error => res.status(422).json({ success: false, error })
    );
};
