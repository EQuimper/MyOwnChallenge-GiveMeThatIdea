import Idea from './model';

export const createIdea = (req, res) => {
  const { title, description, userId } = req.body;

  if (!title) {
    return res.status(422).json({ success: false, message: 'A title is required!' });
  } else if (!description) {
    return res.status(422).json({ success: false, message: 'A description is required!' });
  } else if (!userId) {
    return res.status(422).json({ success: false, message: 'Problem cause no userId!' });
  }

  const newIdea = new Idea({ title, description, author: userId });

  newIdea.save()
    .then(idea => {
      return res.status(201).json({ success: true, message: 'Successfully created!', idea });
    })
    .catch(err => {
      let error;
      if (err.code === 11000) {
        error = 'Duplicate idea title, plz provide a other one!';
      }
      return res.status(422).json({ success: false, message: error || err });
    });
};

export const deleteIdea = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  Idea.findById(id)
    .then(idea => {
      console.log({ idea });
      console.log({ userId });
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

export const getAllIdea = (req, res) => {
  Idea
    .find({})
    .sort({ createdAt: -1 })
    // make sure we don't send the password and other unused field
    .populate('author', '-local.password -updatedAt -createdAt -__v')
    .then(ideas => res.status(200).json({ success: true, ideas }))
    .catch(error => res.status(400).json({ success: false, error }));
};
