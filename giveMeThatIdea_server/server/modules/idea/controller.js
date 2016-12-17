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

  const newIdea = new Idea({ title, description, authorId: userId });

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
