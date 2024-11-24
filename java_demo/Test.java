import java.util.HashSet;

class A {
    static A[] ar;

    public A() {
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(Test.method("dvdf"));
    }

    public static int method(String s) {
        int maxLength = 0;
        HashSet<Character> sub = new HashSet<>();
        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++)
                if (!sub.contains(s.charAt(j))) {
                    sub.add(s.charAt(j));
                } else {
                    maxLength = Math.max(maxLength, sub.size());
                    sub.clear();
                    continue;
                }
        }
        maxLength = Math.max(maxLength, sub.size());

        return maxLength;
    }

    public int longestAlternatingSubarray(int[] nums, int threshold) {
        int l = findLeft(nums, 0, threshold);
        if (l == nums.length)
            return 0;

        int r = l + 1;
        int length = 1, maxLength = 1;

        while (r < nums.length) {
            if (nums[r] <= threshold && nums[r - 1] % 2 != nums[r] % 2) {
                maxLength = Math.max(maxLength, r - l + 1);
                r++;
            } else {
                l = findLeft(nums, r, threshold);
                if (l == nums.length) {
                    return maxLength;
                }
                r = l + 1;
            }
        }
        return maxLength;
    }

    private int findLeft(int[] nums, int i, int threshold) {
        while (i < nums.length && (nums[i] % 2 == 1 || nums[i] > threshold)) {
            i++;
        }
        return i;
    }
}
