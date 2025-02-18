def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Example usage:
if __name__ == "__main__":
    # Test the function
    test_list = [3, 6, 8, 10, 1, 2, 1]
    sorted_list = quicksort(test_list)
    print(f"Original list: {test_list}")
    print(f"Sorted list: {sorted_list}")
