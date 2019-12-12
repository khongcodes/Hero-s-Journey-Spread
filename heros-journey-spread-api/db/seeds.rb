# KEVIN SEEDS
# to be worked on and implemented when there is time

DATA = {
  :major => [
    {
      name: "The Fool",
      meaning_up: "Beginnings, innocence, spontaneity, a free spirit",
      meaning_rev: "Being taken advantage of, recklessness, risk-taking",
      desc: "With all his worldly possessions in one small pack, the Fool travels he knows not where. So filled with visions, questions, wonder and excitement is he, that he doesn't see the cliff he is likely to fall over. At his heel a small dog harries him (or tries to warn him of a possible mis-step). Will the Fool learn to pay attention to where he's going before it's too late?",
    },
    {
      name: "The Magician",
      meaning_up: "Willpower, inspired action, creation, manifestation",
      meaning_rev: "Manipulation, trickery, poor planning, untapped talents",
      desc: "Red and white coloring, the lemniscate (infinity symbol), a small wand, a table displaying a chalice, a pentacle, a staff (wand) and a sword. Skillful, self-confident, a powerful magus with the infinite as a halo floating above his head, the Magician mesmerizes the Fool. Raising his wand to heaven, pointing his finger to Earth, the Magician calls on all powers. Magically, the cloth of the Fool's pack unfolds upon the table, revealing its contents.",
    },
    {
      name: "The High Priestess",
      meaning_up: "Intuitive, unconscious mind, inner voice, divine mystery",
      meaning_rev: "Secrets, disconnected from intuition, repressed feelings",
      desc: "Blue, white and black colors, pomegranates, the moon crown of Isis, veil, solar cross, crescent moon. Black & white lotus, pillars (B stands for Boaz, signifying negation, J stands for Jachin, meaning beginning). Scroll with the word Tora on it (either the Jewish Torah or an anagram of 'Tarot', where the final letter is left unseen). It is partly covered, signifying that this sacred knowledge is both explicit and implicit, it will only be revealed when the student is ready to look beyond the material realm.",
    },
    {
      name: "The Empress",
      meaning_up: "Femininity, beauty, nature, nurturing, abundance",
      meaning_rev: "Dependence, smothering, emptiness, nosiness",
      desc: "A rod, a heart-shaped shield with the symbol for Venus. Her hair gold as wheat, wearing a crown of stars, and a white gown dotted with pomegranates. She rests back on her throne surrounded by an abundant field of grain and a lush garden.",
    },
    {
      name: "The Emperor",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    {
      name: "",
      meaning_up: "",
      meaning_rev: "",
      desc: "",
    },
    
  :minor => {

  }
}

def main
  make_cards
end

# assign card_type and value here
def make_cards
  DATA[:major].each_with_index do |card,index|
    new_card = Card.create(card_type:"major", value:index, name:card[:name], meaning_up:card[:meaning_up], meaning_rev:card[:meaning_rev], desc:card[:desc])
  end
end

main
