INSERT INTO
    recipe (id, name, image_url, description, instructions)
VALUES
    (
        101,
        'Tomato pasta',
        'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Simple pasta with tomato sauce and basil.',
        'Boil pasta, warm the sauce, combine and serve.'
    ),
    (
        102,
        'Garlic chicken',
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
        'Quick chicken with garlic and olive oil.',
        'Cook chicken in olive oil, add garlic, finish until golden.'
    ),
    (
        103,
        'Veggie omelette',
        'https://images.unsplash.com/photo-1646579933415-92109f9805df?q=80&w=1357&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Egg omelette with mixed vegetables.',
        'Whisk eggs, cook vegetables, pour eggs and fold.'
    ),
    (
        104,
        'Tuna salad',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        'Fresh salad with tuna and lemon.',
        'Mix tuna with lettuce, add lemon and olive oil.'
    ),
    (
        105,
        'Rice and beans',
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
        'Comfort food with rice and beans.',
        'Cook rice, warm beans with onion, combine.'
    ),
    (
        106,
        'Beef tacos',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        'Tacos with seasoned ground beef.',
        'Cook beef with spices, fill tortillas and add tomato.'
    ),
    (
        107,
        'Grilled cheese',
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
        'Classic toasted cheese sandwich.',
        'Butter bread, add cheese, toast until melted.'
    ),
    (
        108,
        'Mushroom risotto',
        'https://images.unsplash.com/photo-1609770424775-39ec362f2d94?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Creamy risotto with mushrooms.',
        'Saute mushrooms, cook rice with broth, finish with cheese.'
    ),
    (
        109,
        'Greek salad',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
        'Crisp salad with feta and cucumber.',
        'Chop vegetables, add feta, dress with olive oil.'
    ),
    (
        110,
        'Pancakes',
        'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=900&q=80',
        'Soft pancakes for breakfast.',
        'Mix batter, cook on a pan, flip and serve.'
    );

INSERT INTO
    ingredient (id, name, quantity, recipe_id)
VALUES
    (1001, 'Pasta', '200 g', 101),
    (1002, 'Tomato sauce', '250 g', 101),
    (1003, 'Basil', '5 leaves', 101),
    (1004, 'Chicken breast', '300 g', 102),
    (1005, 'Garlic', '2 cloves', 102),
    (1006, 'Olive oil', '1 tbsp', 102),
    (1007, 'Eggs', '3', 103),
    (1008, 'Bell pepper', '1', 103),
    (1009, 'Onion', '1/2', 103),
    (1010, 'Tuna', '150 g', 104),
    (1011, 'Lettuce', '80 g', 104),
    (1012, 'Lemon juice', '1 tbsp', 104),
    (1013, 'Rice', '200 g', 105),
    (1014, 'Beans', '200 g', 105),
    (1015, 'Onion', '1/2', 105),
    (1016, 'Tortillas', '4', 106),
    (1017, 'Ground beef', '250 g', 106),
    (1018, 'Tomato', '1', 106),
    (1019, 'Bread', '2 slices', 107),
    (1020, 'Cheese', '80 g', 107),
    (1021, 'Butter', '1 tsp', 107),
    (1022, 'Arborio rice', '200 g', 108),
    (1023, 'Mushrooms', '150 g', 108),
    (1024, 'Parmesan', '40 g', 108),
    (1025, 'Cucumber', '1', 109),
    (1026, 'Feta', '80 g', 109),
    (1027, 'Olive oil', '1 tbsp', 109),
    (1028, 'Flour', '200 g', 110),
    (1029, 'Milk', '250 ml', 110),
    (1030, 'Eggs', '2', 110);