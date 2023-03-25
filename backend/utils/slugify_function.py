def slugify_function(content):
    return "-".join(content.replace("_", "-").lower().strip().split())
