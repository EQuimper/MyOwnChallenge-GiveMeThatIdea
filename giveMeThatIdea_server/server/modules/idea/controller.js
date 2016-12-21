import Idea from './model';
import { Category } from '../category';
import { User } from '../user';

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
  const { title, description, category } = req.body;
  const userId = req.user._id;

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
  const userId = req.user._id;

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
  const { authorId } = req.body;
  const uIdea = req.body;
  const userId = req.user._id;

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
const unselectCategory = '-__v';
const unselectComment = '-__v -idea';

export const getAllIdea = (req, res) => {
  const getIdFromIdea = arr => arr.map(i => i._id);

  const ideaPromise = new Promise((resolve, reject) => {
    Idea
      .find({})
      .sort({ createdAt: -1 })
      .populate('author', unselectAuthor)
      .populate('category', unselectCategory)
      .then(
        ideas => resolve(ideas),
        error => reject(error)
      );
  });

  const ideasFollowedByUser = new Promise((resolve, reject) => {
    Idea.find({ usersFollow: req.user._id })
      .then(
        ideasFollow => resolve(ideasFollow),
        error => reject(error)
      );
  });

  const promiseAll = Promise.all([ideaPromise, ideasFollowedByUser])
    .then(
      values => {
        const ideas = values[0];
        const ideasFollow = values[1];
        return res.status(200).json({ success: true, ideas, ideasFollow: getIdFromIdea(ideasFollow) });
      },
      error => res.status(422).json({ success: false, error })
    );

  return promiseAll;
};

export const getOneIdea = (req, res) => {
  Idea.findOne({ slug: req.params.slug })
    .populate('author', unselectAuthor)
    .populate('category', unselectCategory)
    .populate({
      path: 'comments',
      select: unselectComment,
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'author',
        model: 'User',
        select: `${unselectAuthor} -comments`
      }
    })
    .then(
      idea => {
        if (!idea) {
          res.status(422).json({ success: false, message: 'Idea not exist!' });
        }
        return res.status(200).json({ success: true, idea });
      },
      error => res.status(422).json({ success: false, error })
    );
};

export const followIdea = (req, res) => {
  const ideaPromise = new Promise((resolve, reject) => {
    return Idea
      .findByIdAndUpdate(req.params.id, {
        $push: { usersFollow: req.user._id }
      })
      .then(
        idea => resolve(idea),
        error => reject(error)
      );
  });

  const userPromise = new Promise((resolve, reject) => {
    return User
      .findByIdAndUpdate(req.user._id, {
        $push: { ideasFollow: req.params.id }
      })
      .then(
        user => resolve(user),
        error => reject(error)
      );
  });

  const promiseAll = Promise.all([ideaPromise, userPromise])
    .then(
      () => res.status(201).json({ success: true, message: 'Idea followed!' }),
      error => res.status(422).json({ success: false, error })
    );

  return promiseAll;
};

export const unfollowIdea = (req, res) => {
  const ideaPromise = new Promise((resolve, reject) => {
    return Idea
      .findByIdAndUpdate(req.params.id, {
        $pull: { usersFollow: req.user._id }
      })
      .then(
        idea => resolve(idea),
        error => reject(error)
      );
  });

  const userPromise = new Promise((resolve, reject) => {
    return User
      .findByIdAndUpdate(req.user._id, {
        $pull: { ideasFollow: req.params.id },
      })
      .then(
        user => resolve(user),
        error => reject(error)
      );
  });

  const promiseAll = Promise.all([ideaPromise, userPromise])
    .then(
      () => res.status(200).json({ success: true, message: 'Idea unfollow' }),
      error => res.status(422).json({ success: false, error })
    );

  return promiseAll;
};

export const getAllFollowIdea = (req, res) => {
  // const { userId } = req.
};
