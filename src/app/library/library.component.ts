import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  userInfo: any;
  selectedReceiver: any;
  bookView: boolean = false;
  searchText: string;
  bookList: any;
  sort: boolean = true;
  emptyState: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.renderBook();
  }

  renderBook() {
    return (this.bookList = [
      {
        bookName: 'Shuggie Bain',
        author: 'Douglas Stuart',
        imageUrl: 'https://m.media-amazon.com/images/I/81QpFORNvdL.jpg',
        genre: 'Fiction',
        id: '0001',
        description:
          'Shuggie Bain is the debut novel by Scottish-American writer Douglas Stuart, published in 2020. It tells the story of the youngest of three children, Shuggie, growing up with his alcoholic mother Agnes in 1980s post-industrial working-class Glasgow.',
        availability: false,
      },

      {
        bookName: 'The Lovely Bones',
        author: 'Alice Sebold',
        imageUrl: 'https://m.media-amazon.com/images/I/71x7ABw2OnL.jpg',
        genre: 'Fiction',
        id: '0002',
        description:
          'The Lovely Bones is a 2002 novel by American writer Alice Sebold. It is the story of a teenage girl who, after being raped and murdered, watches from her personal Heaven as her family and friends struggle to move on with their lives while she comes to terms with her own death. ',
        availability: false,
      },
      {
        bookName: 'Freefall',
        author: 'Jessica Barry',
        imageUrl:
          'https://kbimages1-a.akamaihd.net/4dead01d-fe9c-4394-b754-917dcf47c579/1200/1200/False/freefall-55.jpg',
        genre: 'Thriller',
        id: '0003',
        description:
          'Freefall is a 2019 novel by American writer Jessica Barry. It is a solid thriller that effectively uses alternating narratives to reveal the story, while elements of wilderness survival, family tension, moneyed influence, and corporate corruption provide a dizzying array of backdrops that keep the reader guessing.',
        availability: false,
      },
      {
        bookName: 'Fierce Kingdom',
        author: 'Gin Phillips',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/91sKKHcuqiL.jpg',
        genre: 'Thriller',
        id: '0004',
        description:
          "Fierce Kingdom is the Alabama writer Gin Phillips's fifth novel, her imagining of how a mother would react in this blackest of nightmares. It is panic-inducingly gripping as Joan dashes in her flip-flops for a hiding place while negotiating the questions and concerns of a four-year-old.",
        availability: true,
      },
      {
        bookName: 'The Dreamers',
        author: 'Karen Thompson Walker',
        imageUrl: 'https://m.media-amazon.com/images/I/81FjenEAoXL.jpg',
        genre: 'Fiction',
        id: '0005',
        description:
          "The Dreamers is a science-fiction novel by the American writer Karen Thompson Walker, published on January 15, 2019 by Random House. Walker's second novel details an ominous sleeping virus that sweeps over the fictional town, Santa Lora, in Southern California.",
        availability: true,
      },
      {
        bookName: 'Educated',
        author: 'Tara Westover',
        imageUrl: 'https://m.media-amazon.com/images/I/81NwOj14S6L.jpg',
        genre: 'Biography',
        id: '0006',
        description:
          'Educated is a memoir by the American author Tara Westover. Westover recounts overcoming her survivalist Mormon family in order to go to college, and emphasizes the importance of education in enlarging her world.',
        availability: true,
      },
      {
        bookName: 'The Power of your subconscious mind',
        author: 'Joseph Murphy',
        imageUrl: 'https://m.media-amazon.com/images/I/81gTwYAhU7L.jpg',
        genre: 'Self Development',
        id: '0007',
        description:
          'The Power of Your Subconscious Mind has been a bestseller since its first publication in 1963, selling many millions of copies since its original publication. It is one of the most brilliant and beloved spiritual self-help works of all time which can help you heal yourself, banish your fears, sleep better, enjoy better relationships and just feel happier.',
        availability: true,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
      },
      {
        bookName: 'The Shadow of the Wind',
        author: 'Carlos Ruiz Zafón',
        imageUrl: 'https://m.media-amazon.com/images/I/81HFlc9Js+L.jpg',
        genre: 'Thriller',
        id: '0009',
        description:
          'The Shadow of the Wind is a 2001 novel by the Spanish writer Carlos Ruiz Zafón and a worldwide bestseller. The book was translated into English in 2004 by Lucia Graves and sold over a million copies in the UK after already achieving success on mainland Europe, topping the Spanish bestseller lists for weeks.',
        availability: false,
      },
      {
        bookName: 'The Lord of the Rings',
        author: 'J. R. R. Tolkien',
        imageUrl:
          'https://kbimages1-a.akamaihd.net/9fe8e235-bb47-43cd-a00c-082b38ac7d8a/1200/1200/False/the-two-towers-the-lord-of-the-rings-book-2-1.jpg',
        genre: 'Fiction',
        id: '0010',
        description:
          "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, intended to be Earth at some time in the distant past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work. ",
        availability: false,
      },
      {
        bookName: 'Educated',
        author: 'Tara Westover',
        imageUrl: 'https://m.media-amazon.com/images/I/81NwOj14S6L.jpg',
        genre: 'Biography',
        id: '0006',
        description:
          'Educated is a memoir by the American author Tara Westover. Westover recounts overcoming her survivalist Mormon family in order to go to college, and emphasizes the importance of education in enlarging her world.',

        availability: false,
      },
      {
        bookName: 'The Power of your subconscious mind',
        author: 'Joseph Murphy',
        imageUrl: 'https://m.media-amazon.com/images/I/81gTwYAhU7L.jpg',
        genre: 'Self Development',
        id: '0007',
        description:
          'The Power of Your Subconscious Mind has been a bestseller since its first publication in 1963, selling many millions of copies since its original publication. It is one of the most brilliant and beloved spiritual self-help works of all time which can help you heal yourself, banish your fears, sleep better, enjoy better relationships and just feel happier.',

        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
        availability: false,
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
      },
      {
        bookName: 'War and Peace',
        author: 'Leo Tolstoy',
        imageUrl: 'https://m.media-amazon.com/images/I/A1aDb5U5myL.jpg',
        genre: 'Historical Fiction',
        id: '0008',
        description:
          'War and Peace is a literary work by the Russian author Leo Tolstoy that mixes fictional narrative with chapters on history and philosophy. It was first published serially, then published in its entirety in 1869.',
      },
    ]);
  }

  onSelect(event: any, item: any, row: any) {
    console.log(event);
    this.bookView = true;
    this.selectedReceiver = item;
    console.log(this.selectedReceiver);
  }

  close() {
    this.bookView = false;
  }

  filterByGenre(genre: any) {
    let currentGenre = genre.value;
    this.renderBook();
    if (currentGenre === currentGenre) {
      this.bookList = this.bookList.filter((v: any) => {
        if (v?.genre === currentGenre) {
          if (this.bookList.length !== 0) {
            this.bookList = v;
            console.log(this.bookList);
            this.emptyState = false;
            return this.bookList;
          } else {
            return (this.emptyState = true);
          }
        }
      });
    }
    if (currentGenre === 'Select genre') {
      this.emptyState = false;
      this.renderBook();
    }
    if (this.bookList.length === 0) {
      this.emptyState = true;
    }
  }

  sortBooks() {
    this.sort = !this.sort;
    if (!this.sort) {
      this.bookList.sort((a: any, b: any) =>
        a.bookName.localeCompare(b.bookName)
      );
    }
    if (this.sort) {
      this.bookList.sort((a: any, b: any) =>
        b.bookName.localeCompare(a.bookName)
      );
    }
  }
}
