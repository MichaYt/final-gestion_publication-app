module.exports = mongoose => {
    const Publication = mongoose.model(
      "publication",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
    return Publication;
  };