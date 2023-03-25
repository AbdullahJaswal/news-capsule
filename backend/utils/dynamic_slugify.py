from django.utils.text import slugify


def dynamic_slugify(text: str, slugs: set) -> str:
    """This function takes a text string, cleans it up, and returns a slug.

    If the slug is not unique, a number is added to the end of it.
    For example, if the slug is "hello-world" and it is not unique, it will be
    changed to "hello-world-2", "hello-world-3", etc.
    """

    slug: str = slugify(text)

    # if the slug is already in the set, add a number to the end
    if slug in slugs:
        num: int = 2

        # keep incrementing the number until the slug is unique
        while f"{slug}-{num}" in slugs:
            num += 1

        slug: str = f"{slug}-{num}"

    return slug
